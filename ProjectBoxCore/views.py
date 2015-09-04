from json import dumps
import json
from bson import json_util, ObjectId
from django.http import HttpResponse
from django.shortcuts import render
from pymongo import MongoClient
from rest_framework.views import APIView

client = MongoClient("127.0.0.1", 27017)
boxes = client.db.boxes

class Box(APIView):
    def put(self, request, format=None):
        name = request.PUT["name"]
        boxes.insert({"name": name})
        return HttpResponse(request.user.username)

    def post(self,request,format=None):
        data = {}
        for key,value in request.POST.items():
            data[key] = value
        del data["id"]
        if "item_id" not in request.POST:
            data["_id"] =  ObjectId()
            print(data)
            boxes.update({"_id": ObjectId(request.POST["id"])},
                {
                    "$push": {
                         "_data":data
                    }
                })
        else:
            del data["item_id"]
            for key,value in data.items():
                boxes.update({"_id": ObjectId(request.POST["id"]) , "_data._id" : ObjectId(request.POST.get("item_id", ""))},
                    {
                        "$set": {
                            "_data.$." + key: value
                        }
                    })
        return HttpResponse("")

    def get(self,request,format=None):
        return HttpResponse(json.dumps(list(boxes.find()), sort_keys=True, indent=4, default=json_util.default))

class User(APIView):
    def get(self , request , fromat=None):
        return HttpResponse(request.user.id)