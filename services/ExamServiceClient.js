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
       //const EXAM_API_URL = 'http://192.168.159.2:8080/api/exam';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
             return 'https://webdev-rastogi-shubham.herokuapp.com/api/exam';
        // else
        //return EXAM_API_URL;

    }

    createTopicUrl(){
        //const TOPIC_API_URL = 'http://192.168.159.2:8080/api/topic';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
             return 'https://webdev-rastogi-shubham.herokuapp.com/api/topic';
        // else
        //return TOPIC_API_URL;

    }

    createQuestionUrl(){
        //const QUESTIONS_API_URL = 'http://192.168.159.2:8080/api/question';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
             return 'https://webdev-rastogi-shubham.herokuapp.com/api/question';
        // else
        //return QUESTIONS_API_URL;

    }

    createExam(topicId,exam) {
        return fetch(this.createTopicUrl()+'/'+topicId+'/'+'exam',{
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
        var choices=multi.choices;
        delete multi['choices']
        var output={multi:multi,choices:choices}
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
        var vars=blanks.variables;
        delete blanks['variables']
        var output={fill:blanks,vars:vars}
        return fetch(this.createExamUrl()+'/'+examId+'/'+'blanks',{
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

    updateEssay(questionId,essay) {
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
        var choices=multi.choices;
        delete multi['choices']
        var output={multi:multi,choices:choices}
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
        var vars=blanks.variables;
        delete blanks['variables']
        var output={fill:blanks,vars:vars}
        return fetch( this.createQuestionUrl()+ '/' + questionId+'/blanks',
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

    updateTrueFalse(questionId,truefalse) {
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

    deleteQuestion(questionId,qType,callback) {
        return fetch(this.createQuestionUrl() + '/' + questionId+'/'+qType,
            {
                method: 'DELETE'
            }).then(callback);

    }
}

export default ExamServiceClient;