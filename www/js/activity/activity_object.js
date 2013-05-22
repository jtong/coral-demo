function Activity(name){
  this.name = name;
  this.applicant = [];
  this.bids = [];
}

Activity.prototype.create = function(){
    var activity_json = {
        applicant : this.applicant,
        bids : this.bids
    };
    localStorage[this.name] = JSON.stringify(activity_json);


    var activity_name = JSON.parse(localStorage.ActivityNames);
    activity_name.push(this.name);
    localStorage.ActivityNames = JSON.stringify(activity_name);
}

Activity.prototype.find_by_name = function(name){
    var result;
    if (localStorage[name]){
        var activity_json = JSON.parse(localStorage[name]);
        result = new Activity(name);
        result.applicant = activity_json.applicant;
        result.bids = activity_json.bids;
    }
    return result;
}