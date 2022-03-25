window.onscroll = function(){navBar()};

var nav = document.getElementById("navbar");
var sticky = nav.offsetTop;

function navBar() {
    if (window.pageXOffset >= sticky){
        nav.classList.add("sticky");
    }else{
        nav.classList.remove("sticky");
    }
}

function person(fname, lname, uname, pfp, post){
    this.firstName = fname;
    this.lastName = lname;
    this.userName =  uname,
    this.pfp = pfp;
    this.posts = post
}

function post(type, content, des){
    this.type = type;
    this.content = content;
    this.des = des;
}

var post1 = new post("img", "house.jpg", "New house! ");

var post2 = new post("txt", "My dogshit taste goes here", "link");

var person1 = new person("Jake", " ", "Jake", "pfpholder.png", post1);

var person2 = new person("Bob", "Dylan", "BDylan", "stretched-1366-768-1064785.png", post2);


function createPost(person){
    var cont;
    if(person.posts.type == 'img'){
       cont = '<img src = ' + person.posts.content + '>' +
       '<p>' + person.posts.des + '</p>'
    }else if (person.posts.type = 'txt'){
        cont = '<p>' + person.posts.content + '</p>'
    }

    $("#main").append(
        '<div class = "post">\
            <div class = "name">\
                <img class = "profile" src = '+ person.pfp + ' alt = "pfp">\
                <h1><a href = "profile.html" class = "pro">' + person.userName + '</a></h1>\
            </div>\
            <div class = "post-content">' + 
                cont + 
            '</div>\
         </div>'
    )
}

function profile(){
    console.log("here");      
}

$(document).ready(function(){
    // $("h1").click(function(){
    // var href = $(".pro").attr("profile.html");
    // window.location.href = href;
    createPost(person1);
    createPost(person2);
    person1.posts = post2;

    createPost(person1);
  //  })
})
