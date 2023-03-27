
export const BASEURL :string = "http://192.168.2.134:3000";  //api endPoint

export const VERSION : string = "/v1";
export const APIURL : string = BASEURL+VERSION

//feedback/query api url
export const CREATEFEEDBACKURL = APIURL+"/feedback/create";   //create feedback url
export const GETALLFEEDBACK =   APIURL+"/feedback/get-all";   //get allFeedback data
export const FEEDBACKUPDATEURL = APIURL+"/feedback/update/";  //update feedback
export const GETFEEDBACKURL = APIURL+"/feedback/get";          //get single feedback data  
export const FEEDBACKDELETEURL = APIURL+"/feedback/delete/";   //delete feedback data
export const FEEDBACKASSIGNEDTO = APIURL+"/feedback/get-assigned";  //feedback assigned
export const FEEDBACKUSER = APIURL+"/feedback/get-users/";           // feedback users   
export const REASSIGNEDQUERYDATA = APIURL+"/feedback/re-assign/"    //re-assigned data


//user-list api url =>slider
export const USERLISTURL = APIURL+"/user/list";   
export const SLIDERURL = APIURL+"/slider/add-slider";
export const GETSLIDERURL = APIURL+"/slider/get-slider/";
export const ALLSLIDERURL = APIURL+"/slider/get-slider";
export const DELETESLIDERURL = APIURL+"/slider/delete-slider/";  // delete api url
export const EDITSLIDER = APIURL+"/slider/edit-slider/";   // edit-slider url

//admin api url
export const ADMINLISTURL = APIURL+"/admin/admin-list";   //admin-list api url

//users api url
export const REGISTRATIONURL = APIURL+"/user/create"; //url for signUp api
export const LOGINURL = APIURL+"/user/login";         //url for login api
export const PASSWORDRESETURL = APIURL+"/users/forgot-password"; //url for resetPassword






