window.onload = (event => {
    //Create Basic UI
    let body = document.body; 
    let title = document.createElement("h1");
    title.setAttribute("id", "title");
    title.innerText = "Cat Pic";
    body.appendChild(title);

    let div = document.createElement("div");
    div.setAttribute("class", "cat-box");
    body.appendChild(div);
    let img = document.createElement("img");
    div.appendChild(img);

    let catApi = "https://api.thecatapi.com/v1/images/search"
    let catImgUrl;

    //updates img with new url from catAPI
    const getCatImg = () => {
        const catImg = fetch(catApi)
            .then((res) => res.json())
            .then((data) => {
                img.setAttribute("src", data[0]["url"]);
                img.setAttribute("class", "cat-pic");
                img.setAttribute("id", "c1");
                localStorage.setItem("imgUrl", data[0]["url"] );
            });
    }

    //Check to see if the user was previously on the page and restore settings
    let score = 0;

    if (localStorage.getItem("imgUrl")) {
        let imgUrl = localStorage.getItem("imgUrl");
        img.setAttribute("src", imgUrl);
        img.setAttribute("class", "cat-pic");
        img.setAttribute("id", "c1");
    }else{
        getCatImg();
    }

    if(localStorage.getItem("score")){
        score = parseInt(localStorage.getItem("score"));
    }


    //Interctions with Images 
    let interactions = document.createElement("div");
    interactions.setAttribute("class", "interactions");
    interactions.setAttribute("id", "inter-container");
    body.appendChild(interactions);

    let newBtn = document.createElement("button");
    newBtn.innerText = "New Cat";
    interactions.appendChild(newBtn);
    
    let scores = document.createElement("div");
    scores.setAttribute("id", "score-cont");
    interactions.appendChild(scores);

    let popScore = document.createElement("div");
    popScore.innerText = "Popularity Score: " + score;
    popScore.setAttribute("class", "int")
    scores.appendChild(popScore);
    

    let upBtn = document.createElement("button");
    upBtn.innerText = "Upvote";
    upBtn.setAttribute("class", "votes")

    let downBtn = document.createElement("button");
    downBtn.innerText = "Downvote";
    downBtn.setAttribute("class", "votes");

    let votes = document.createElement("div");
    votes.setAttribute("id", "vote-box");
    votes.appendChild(upBtn);
    votes.appendChild(downBtn);
    scores.appendChild(votes);

    let form = document.createElement("div");
    form.setAttribute("id", "form");
    let lab = document.createElement("label");
    lab.setAttribute("for", "comm");
    lab.innerText = "Comment: ";
    let inp = document.createElement("input");
    inp.setAttribute("type", "text" );
    inp.setAttribute("id", "comm");
    inp.setAttribute("name", "comm");
    let sub = document.createElement("button");
    sub.innerText = "Submit";
    sub.setAttribute("type", "submit");

    form.appendChild(lab);
    form.appendChild(inp);
    form.appendChild(sub);
    interactions.appendChild(form);

    
    let comments = {};
    let commentBox = document.createElement("ul");
    commentBox.innerText = "Comments";
    commentBox.setAttribute("id", "comments");
    interactions.appendChild(commentBox);
    let nextCommId = 0;

    //Check to see if comments were added already 
    if (localStorage.getItem("comments")) {
        comments = localStorage.getItem("comments");
        comments = JSON.parse(comments);
        for (let key in comments) {
            updateComments(comments[key], key);
        }
    }

    //Request new cat, reset all buttons and comments
    newBtn.addEventListener("click", event => {
        getCatImg(); 
        score = 0;
        setScore();
        let listItems = document.querySelectorAll(".comm");
        listItems.forEach(ele => ele.remove());
        inp.value = "";
        comments = {};
        localStorage.setItem("comments", JSON.stringify(comments));
    })

    //Up vote cat
    upBtn.addEventListener("click", event => {
        score++; 
        setScore(); 
    })

    //down vote cat
    downBtn.addEventListener("click", event => {
        score--;
        setScore();
    })

    //submit comment
    sub.addEventListener("click", event => {
        let comm = inp.value;
        inp.value = "";
        updateComments(comm);
    })

    //Update the current score
    function setScore() {
        popScore.innerText = "Popularity Score: " + score;
        localStorage.setItem("score", score.toString())
    }

    //Update Comments
    function updateComments(c1, id){
        let li = document.createElement("li");
        li.setAttribute("class", "comm");
        li.innerText = c1;
        if(!id){
            id = getCommID();
            comments[id] = c1;
        }
        li.setAttribute("id", id);
        commentBox.appendChild(li);
        localStorage.setItem("comments", JSON.stringify(comments));
    }
    
    //get comment ID
    function getCommID() {
        let curr = nextCommId.toString();
        nextCommId++;
        return curr;
    }

  
});