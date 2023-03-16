
export const BASEURL :string = "http://172.16.1.129:3000";  //api endPoint


export const VERSION : string = "/v1";
export const APIURL : string = BASEURL+VERSION

//feedback/query api url
export const createFeedbackUrl = APIURL+"/feedback/create";   //create feedback url
export const getAllFeedback =   APIURL+"/feedback/get-all";   //get allFeedback data
export const feedbackUpdaateUrl = APIURL+"/feedback/update/";  //update feedback
export const getFeedbackUrl = APIURL+"/feedback/get";          //get single feedback data  
export const feedbackDeleteUrl = APIURL+"/feedback/delete/";   //delete feedback data
export const feedbackAssignedTo = APIURL+"/feedback/get-assigned";  //feedback assigned


//user-list api url
export const userListUrl = APIURL+"/user/list";   
export const sliderUrl = APIURL+"/slider/add-slider";
export const getsliderUrl = APIURL+"/slider/get-slider/";
export const allSliderUrl = APIURL+"/slider/get-slider";
export const deleteSlideUrl = APIURL+"/slider/delete-slider/";  // delete api url
export const editSlidrUrl = APIURL+"/slider/edit-slider/";   // edit-slider url

//admin api url
export const adminListUrl = APIURL+"/admin/admin-list";   //admin-list api url

//users api url
export const registrationUrl = APIURL+"/user/create"; //url for signUp api
export const loginUrl = APIURL+"/user/login";         //url for login api
export const passwordResetUrl = APIURL+"/users/forgot-password"; //url for resetPassword






