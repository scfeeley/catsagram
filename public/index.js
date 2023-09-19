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
            });
    }
    getCatImg();

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

    let score = 0;
    let comments =[];

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

    let commentBox = document.createElement("ul");
    commentBox.innerText = "Comments";
    commentBox.setAttribute("id", "comments");
    interactions.appendChild(commentBox);
    let nextCommId = 0;

    //Request new cat, reset all buttons and comments
    newBtn.addEventListener("click", event => {
        getCatImg(); 
        score = 0;
        setScore();
        let listItems = document.querySelectorAll(".comm");
        listItems.forEach(ele => ele.remove());
        inp.value = "";
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
    }

    //Update Comments
    function updateComments(c1){
        let li = document.createElement("li");
        li.setAttribute("class", "comm");
        li.innerText = c1;
        li.setAttribute("id", getCommID());
        commentBox.appendChild(li);
    }
    
    //get comment ID
    function getCommID() {
        let curr = nextCommId.toString();
        nextCommId++;
        return curr;
    }

  
});