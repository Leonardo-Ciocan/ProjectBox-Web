from json import dumps
import json
from bson import json_util, ObjectId
import django
from django.contrib import auth
from django.contrib.auth import authenticate, login
from django.contrib.auth.decorators import login_required
from django.contrib.auth.models import User
from django.http import HttpResponse, QueryDict, HttpResponseRedirect
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from pymongo import MongoClient
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from ProjectBoxCore.forms import SignupForm

client = MongoClient("127.0.0.1", 27017)
boxes = client.db.boxes
print("client is " + str(client))
class Box(APIView):
    def post(self,request,format=None):
        data = {}
        print(request.POST)
        for key, value in request.POST.items():
            data[key] = value
        del data["id"]
        del data["csrfmiddlewaretoken"]
        if "item_id" not in request.POST:
            data["_id"] = ObjectId()
            print(data)
            boxes.update({"_id": ObjectId(request.POST["id"])},
                {
                    "$push": {
                         "_data":data
                    }
                })
        else:
            del data["item_id"]
            for key, value in data.items():
                boxes.update({"_id": ObjectId(request.POST["id"]),
                              "_data._id": ObjectId(request.POST.get("item_id", ""))},
                    {
                        "$set": {
                            "_data.$." + key: value
                        }
                    })
        return HttpResponse([data["_id"] if "_id" in data else ""])

    def get(self,request,format=None):
        print([request.GET["id"] if "id" in request.GET else "none"])
        return HttpResponse(json.dumps(list(boxes.find({"_id": ObjectId(request.user.id)})), sort_keys=True, indent=4, default=json_util.default))

class UserEndpoint(APIView):
    def get(self , request , fromat=None):
        return HttpResponse(request.user.username)

class Login(APIView):
    def post(self , request , fromat=None):
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(username=username,password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect("/user/")
        else:
            return HttpResponse(status=403)

    def get(self , request , fromat=None):
        print(list(boxes.find()))
        return render(request , "login.html")


@api_view(['GET', 'POST'])
def logout(request):
    auth.logout(request)
    return HttpResponseRedirect("/login/")

@api_view(['GET'])
def box(request , id):
    return render(request , "box.html" , {"box":boxes.find_one({"_id" : ObjectId(id)}), "boxes":list(boxes.find({"creator" : request.user.id}))})

@api_view(['POST'])
def signup(request):
    data = {}
    data["username"] = request.POST["username"]
    data["password"] = request.POST["password"]
    data["email"] = request.POST.get("email","")
    form = SignupForm(data = data)
    if form.is_valid():
        username = form.cleaned_data["username"]
        password = form.cleaned_data["password"]
        email    = form.cleaned_data.get("email" ,"")
        User.objects.create_user(username=username,
                                 email=email,
                                 password=password)
        user = authenticate(username=username,password=password,email=email)
        if user is not None:
            if user.is_active:
                login(request, user)
                return HttpResponseRedirect("/user/")
        else:
            return HttpResponse(status=403)
    else:
        return HttpResponse(json.dumps(form.errors) , status=403)

@login_required(login_url="/login/")
@api_view(["GET"])
def index(request):
    return render(request , "index.html",{"boxes":list(boxes.find({"creator":request.user.id})) , "hide_boxes" : True})

@login_required(login_url="/login/")
@api_view(["POST","GET"])
def create_box(request):
    if request.method == "POST":
        print(request)
        name = request.POST["name"]
        structure = json.loads(request.POST["structure"])
        print(structure)
        box = boxes.insert({"name": name , "structure" : structure , "creator" : request.user.id})
        return HttpResponse(str(box))
    else:
        return render(request,"createbox.html")

@login_required(login_url="/login/")
@api_view(["POST"])
def delete_item(request):
    boxes.update(
      { "_id" : ObjectId(request.POST["id"]) },
      { "$pull": { '_data': { "_id": ObjectId(request.POST["item_id"]) } } }
    )
    return HttpResponse(status=200)

@login_required(login_url="/login/")
@api_view(["POST"])
def add_contributor(request):
    user = django.contrib.auth.User.objects.filter(username=request.GET["username"])
    uid = None
    if user.exists:
        uid = user.id
        boxes.update(
            {"_id": ObjectId(request.POST["id"])},

            {
                "$push": {
                     "contributors": uid
                }
            }
        )

    return HttpResponse(status=200)


@login_required(login_url="/login/")
@api_view(["GET"])
def get_username(request):
    user = django.contrib.auth.User.objects.filter(id=request.GET["id"])
    if user.exists():
        return HttpResponse(user.username)
    return HttpResponse(status=404)