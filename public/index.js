window.onload = (event => {
    let body = document.body; 
    let title = document.createElement("h1");
    title.setAttribute("id", "title");
    title.innerText = "Cat Pic";
    body.appendChild(title);

    let div = document.createElement("div");
    div.setAttribute("class", "cat-box");
    let img = document.createElement("img");
    let catApi = "https://api.thecatapi.com/v1/images/search"
    let catImgUrl;
    const catImg = fetch(catApi)
                    .then((res) => res.json())
                    .then((data) => {
                        img.setAttribute("src", data[0]["url"]);
                        img.setAttribute("class", "cat-pic");
                        img.setAttribute("id", "c1");
                        div.appendChild(img);
                        body.appendChild(div);
                    })
});