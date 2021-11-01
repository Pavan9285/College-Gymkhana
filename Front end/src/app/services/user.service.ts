import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private _http:HttpClient) { }


  getRegister(userData) {
    let url = 'http://localhost:3000/register';
   return this._http.post<any>(url,userData)
  }

  getLogin(body){
    let URL="http://localhost:3000/login";
    return this._http.post(URL,body)
  }

  updateInventoryitem(userData){
    let url = 'http://localhost:3000/updateInventoryitem';
   return this._http.put<any>(url,userData)
  }

  updateHistorysitemhistory(userData){
    let url = 'http://localhost:3000/updateHistorysitemhistory';
   return this._http.put<any>(url,userData)
  }

  getGame(){
    let URL="http://localhost:3000/getGame";
    return this._http.get(URL)
  }

  getGameitem(gameId){
    let URL="http://localhost:3000/getGameitem/"+gameId;
    return this._http.get(URL)
  }

  getGameitemhistory(gameId){
    let URL="http://localhost:3000/getGameitemhistory/"+gameId;
    return this._http.get(URL)
  }

  addGame(body){
    let URL="http://localhost:3000/addGame";
    return this._http.post(URL,body)
  }

  addItem(body){
    let URL="http://localhost:3000/addItem";
    return this._http.post(URL,body)
  }

  addItemhistory(body){
    let URL="http://localhost:3000/addItemhistory";
    return this._http.post(URL,body)
  }

  addFeedback(body){
    let URL="http://localhost:3000/addFeedback";
    return this._http.post(URL,body)
  }

  getFeedback(){
    let URL="http://localhost:3000/getFeedback";
    return this._http.get(URL)
  }

  getDegree(){
    let URL="http://localhost:3000/getDegree";
    return this._http.get(URL)
  }

  getDegreeclass(degreeId){
    let URL="http://localhost:3000/getDegreeclass/"+degreeId;
    return this._http.get(URL)
  }

  addDegree(body){
    let URL="http://localhost:3000/addDegree";
    return this._http.post(URL,body)
  }

  addClass(body){
    let URL="http://localhost:3000/addClass";
    return this._http.post(URL,body)
  }

  updateTimetableclass(userData){
    let url = 'http://localhost:3000/updateTimetableclass';
   return this._http.put<any>(url,userData)
  }

  updateEventsinformation(userData){
    let url = 'http://localhost:3000/updateEventsinformation';
   return this._http.put<any>(url,userData)
  }

  getEvent(){
    let URL="http://localhost:3000/getEvent";
    return this._http.get(URL)
  }

  getEventinformation(eventId){
    let URL="http://localhost:3000/getEventinformation/"+eventId;
    return this._http.get(URL)
  }

  addEvent(body){
    let URL="http://localhost:3000/addEvent";
    return this._http.post(URL,body)
  }

  addInformation(body){
    let URL="http://localhost:3000/addInformation";
    return this._http.post(URL,body)
  }

  deleteFeedback(id){
    let url="http://localhost:3000/feedback/"+id;
    return this._http.delete(url)
  }

}
