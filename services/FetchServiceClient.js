import 'es6-symbol/implement';
let _singleton = Symbol();

class FetchServiceClient {
    constructor(singletonToken) {
        if (_singleton !== singletonToken)
            throw new Error('Cannot instantiate directly.');
    }

    static get instance() {
        if (!this[_singleton])
            this[_singleton] = new FetchServiceClient(_singleton);
        return this[_singleton]
    }

    createCourseUrl(){
       // const COURSE_API_URL = 'http://192.168.159.2:8080/api/course';
        // var url=window.location.href;
        // if(!url.toString().includes('10.0.0.22') && !url.toString().includes('localhost'))
             return 'https://webdev-rastogi-shubham.herokuapp.com/api/course';
        // else
           // return COURSE_API_URL;

    }


    findAllCourses() {
        return fetch(this.createCourseUrl())
            .then(function (response) {
                if(response.headers.get("content-type")!=null)
                    return response.json();
                else return null;
            });
    }

    findAllModulesForCourse(courseId) {
        return fetch(this.createCourseUrl() + '/' + courseId+'/module',
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllLessonsForModule(courseId,moduleId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllTopicsForLesson(courseId,moduleId,lessonId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }

    findAllWidgetsForTopic(courseId,moduleId,lessonId,topicId) {
        return fetch(this.createCourseUrl()+'/'+courseId+'/'+'module/'+moduleId+'/lesson/'+lessonId+'/topic/'+topicId+'/widget' ,
            {
                method: 'GET'
            }).then(function (response) {
            if(response.headers.get("content-type")!=null)
                return response.json();
            else return null;
        });
    }



}

export default FetchServiceClient;