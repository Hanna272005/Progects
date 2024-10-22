let comments =[]
loadComments();

document.getElementById('comment-add').onclick=function(e){
    e.preventDefault();
   // Event.stopImmediatePropagation();
    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now()/1000) 
    }

    commentName.value = '';
    commentBody.value = '';

    comments.push(comment);

    saveComments();
    showComments();
}

function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments(){
    if( localStorage.getItem('comments') ) comments = JSON.parse(localStorage.getItem('comments'));
    showComments();
}

function showComments(){
    let commentField = document.getElementById('comment-field');
    let out = '';
    comments.forEach(item =>{
      out += `<p class="text-center small"><em>${timeConverter(item.time)}</em></p>`;
      out += `<p class="alert alert-primary">Имя пользователя: ${item.name}</p>`;
      out += `<p class="alert alert-success">Комментарий: ${item.body}</p>`;
     
    });
    commentField.innerHTML = out;
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000);
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let time = `${date} ${month} ${year} ${hour}:${min}`;
    return time;
}
