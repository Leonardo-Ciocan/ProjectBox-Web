from json import dumps
import json
from bson import json_util, ObjectId
from django.contrib import auth
from django.contrib.auth import authenticate, login
from django.http import HttpResponse, QueryDict, HttpResponseRedirect
from django.shortcuts import render
from pymongo import MongoClient
from rest_framework.decorators import api_view
from rest_framework.views import APIView

client = MongoClient("127.0.0.1", 27017)
boxes = client.db.boxes
print("client is " + str(client))
class Box(APIView):
    def put(self, request, format=None):
        print("xyu")
        print(request.body)
        arr = json.loads(request.body.decode("utf-8"))
        print(arr)
        name = arr["name"]
        print(name)
        structure = arr["structure"]
        print(structure)
        boxes.insert({"name": name , "structure" : structure})
        return HttpResponse("")

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
        if "id" in request.GET:
            return HttpResponse(json.dumps(list(boxes.find({"_id": ObjectId(request.GET["id"])})),
                                           sort_keys=True, indent=4, default=json_util.default))
        else:
            return HttpResponse(json.dumps(list(boxes.find()), sort_keys=True, indent=4, default=json_util.default))

class User(APIView):
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
    return render(request , "box.html" , {"box":boxes.find_one({"_id" : ObjectId(id)}), "boxes":list(boxes.find())})

def signup(request):
    username = request.POST["username"]
    password = request.POST["password"]
    email = request.POST["email"]