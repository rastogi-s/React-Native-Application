import 'es6-symbol/implement';
let _singleton = Symbol();

class AssignmentServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new AssignmentServiceClient(_singleton);
        return this[_singleton]
    }

    createAssignmentUrl(){
        const ASSIGNMENT_API_URL = 'http://192.168.159.2:8080/api/assignment';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
        //     return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
        return ASSIGNMENT_API_URL;

    }


    createTopicUrl(){
        const TOPIC_API_URL = 'http://192.168.159.2:8080/api/topic';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
        //     return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
        return TOPIC_API_URL;

    }

    createAssignment(topicId,assignment) {
        console.log(topicId);
        console.log(assignment);
        return fetch(this.createTopicUrl()+'/'+topicId+'/'+'assignment',{
            body: JSON.stringify(assignment),
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }


    // findAllQuestionsForExam(examId) {
    //     return fetch(this.createExamUrl()+'/'+examId+'/question')
    //         .then(function (response) {
    //             if(response.headers.get("content-type")!=null)
    //                 return response.json();
    //             else return null;
    //         });
    // }

    updateAssignment(assignmentId,assignment) {
        console.log(assignmentId);
        console.log(assignment);
        console.log("in here");
        console.log('waht!!!');

        return fetch(this.createAssignmentUrl() + '/' + assignmentId,
            {
                body: JSON.stringify(assignment),
                headers: {
                    'Content-Type': 'application/json'
                },
                method: 'PUT'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    deleteAssignment(assignId,callback) {
        return fetch(this.createAssignmentUrl() + '/' + assignId,
            {
                method: 'DELETE'
            }).then(callback);

    }

}

export default AssignmentServiceClient;