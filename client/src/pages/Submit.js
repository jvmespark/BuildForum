// page to create a post and submit

function Submit() {
    function createPost() {
      let title = prompt('Enter title');
      let description = prompt('Enter description');
      fetch('http://localhost:3001/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({title, description}),
      })
    }
  
    return (
        <div>
            <form action="/">
                <input type="submit" value="Home" />
            </form>
            <button onClick={createPost}>Create Post</button>
        </div>
    );
}

export default Submit;