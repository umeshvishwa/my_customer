var feedbackDao = require("../models/Feedback");

module.exports.addFeedback = function(body, callback){
    console.log("Adding new feedback");
    feedbackDao.addFeedback(body, callback);
}

module.exports.getFeedbackDetails = function(params, callback){
    console.log("Fetching details for feedback: " + params.id);
    feedbackDao.findOne(params.id, callback);
}

module.exports.getAllFeedbacks = function(query, callback){
    console.log("Fetching all feedbacks");
    feedbackDao.findAll(query, callback);
}

module.exports.getAllFeedbacksWithoutPagination = function(query, callback){
    console.log("Fetching all feedbacks without pagination");
    feedbackDao.findAllFeedbacks(query, callback);
}

module.exports.updateFeedback = function(body, id, callback){
    console.log("Editing feedback");
    feedbackDao.updateFeedback(body, id, callback);
}
module.exports.deleteFeedback = function(id, callback){
    console.log("Deleting feedback");
    feedbackDao.deleteFeedback(id, callback);
}