import 'es6-symbol/implement';
let _singleton = Symbol();

class ExamServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new ExamServiceClient(_singleton);
        return this[_singleton]
    }

    createExamUrl(){
        const EXAM_API_URL = 'http://192.168.159.2:8080/api/exam';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
        //     return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
        return EXAM_API_URL;

    }

    createTopicUrl(){
        const TOPIC_API_URL = 'http://192.168.159.2:8080/api/topic';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
        //     return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
        return TOPIC_API_URL;

    }

    createQuestionUrl(){
        const QUESTIONS_API_URL = 'http://192.168.159.2:8080/api/question';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
        //     return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
        return QUESTIONS_API_URL;

    }

    createExam(topicId,exam) {
        console.log(topicId);
        console.log(exam);
        return fetch(this.createTopicUrl()+'/'+topicId+'/'+'assignment',{
            body: JSON.stringify(exam),
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


    updateExam(examId,exam) {
        console.log(examId);
        console.log(exam);
        return fetch(this.createExamUrl() + '/' + examId,
            {
                body: JSON.stringify(exam),
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

    deleteExam(examId,callback) {
        return fetch(this.createExamUrl() + '/' + examId,
            {
                method: 'DELETE'
            }).then(callback);

    }

    findAllQuestionsForExam(examId) {
        return fetch(this.createExamUrl()+'/'+examId+'/question')
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    createMultipleChoiceQuestion(examId,multi){
        console.log(examId);
        var choices=multi.choices;
        delete multi['choices']
        var output={multi:multi,choices:choices}
        console.log(output);
        return fetch(this.createExamUrl()+'/'+examId+'/'+'choice',{
            body: JSON.stringify(output),
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

    createTrueFalseQuestion(examId,truefalse){
        console.log(examId);
        console.log(truefalse);
        return fetch(this.createExamUrl()+'/'+examId+'/'+'truefalse',{
            body: JSON.stringify(truefalse),
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

    createEssayQuestion(examId,essay){
        console.log(examId);
        console.log(essay);
        return fetch(this.createExamUrl()+'/'+examId+'/'+'essay',{
            body: JSON.stringify(essay),
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

    createFillInTheBlanksQuestion(examId,blanks){
        console.log(examId);
        console.log(blanks);
        return fetch(this.createExamUrl()+'/'+examId+'/'+'blanks',{
            body: JSON.stringify(blanks),
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

    updateEssay(questionId,essay) {
        console.log(questionId);
        console.log(essay);
        return fetch( this.createQuestionUrl()+ '/' + questionId+'/essay',
            {
                body: JSON.stringify(essay),
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

    updateMulti(questionId,multi) {
        console.log(multi);

        var choices=multi.choices;
        delete multi['choices']
        var output={multi:multi,choices:choices}
        console.log(output);
        return fetch( this.createQuestionUrl()+ '/' + questionId+'/multi',
            {
                body: JSON.stringify(output),
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

    updateFillInTheBlanks(questionId,blanks) {
        console.log(questionId);
        console.log(blanks);
        return fetch( this.createQuestionUrl()+ '/' + questionId+'/blanks',
            {
                body: JSON.stringify(blanks),
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

    updateTrueFalse(questionId,truefalse) {
        console.log(questionId);
        console.log(truefalse);
        return fetch( this.createQuestionUrl()+ '/' + questionId+'/truefalse',
            {
                body: JSON.stringify(truefalse),
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
}

export default ExamServiceClient;