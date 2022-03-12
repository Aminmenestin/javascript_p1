const task_form=document.querySelector('#task-form');
const task=document.querySelector('#task');
const list_group=document.querySelector('.list-group');
const filter=document.querySelector('#filter');
const clear_task=document.querySelector('.clear-task');


EventListener();

function EventListener(){
    document.addEventListener('DOMContentLoaded',load_tasks);
    task_form.addEventListener('submit',addtask);
    filter.addEventListener('keyup',check_word);
    list_group.addEventListener('click',remove_task);
    clear_task.addEventListener('click',remove_all_tasls);

}


// load_tasks

function load_tasks(){
    let all_local_values;
    if(localStorage.getItem('all_local_values')==null){
        all_local_values=[];
    }
    else{
        all_local_values=JSON.parse(localStorage.getItem('all_local_values'));
    }

    all_local_values.forEach(function (value){
        let li=document.createElement('li');
        li.className='list-group-item d-flex align-items-center justify-content-between';
        li.appendChild(document.createTextNode(value));
        let i=document.createElement('i');
        i.className='bi bi-x fs-3 text-danger delete-item pt-1';
        li.appendChild(i);
        list_group.appendChild(li);
    })
}



// Add_task

function addtask(e){
    if(task.value==''){
        alert('Please enter sth');
    }
    else{
        let li=document.createElement('li');
        li.className='list-group-item d-flex align-items-center justify-content-between';
        li.appendChild(document.createTextNode(task.value));
        let i=document.createElement('i');
        i.className='bi bi-x fs-3 text-danger delete-item pt-1';
        li.appendChild(i);
        list_group.appendChild(li);
        add_to_local_storage(task.value);
        task.value='';

    }
    e.preventDefault();
}


// add_to_local_storage


function add_to_local_storage(value){
    let all_local_values;
    if(localStorage.getItem('all_local_values')==null){
        all_local_values=[];
    }
    else{
        all_local_values=JSON.parse(localStorage.getItem('all_local_values'));
    }

    all_local_values.push(value);
    localStorage.setItem('all_local_values',JSON.stringify(all_local_values));
}




// Remove_task


function remove_task(e){
    if(e.target.classList.contains('delete-item')){
        if(confirm('are you sure to delete this task?')){
            e.target.parentElement.remove();
            remove_from_local_storege(e.target.parentElement);
        }
    }
        
    
}



function remove_from_local_storege(removed_li){
    let all_local_values;
    if(localStorage.getItem('all_local_values')==null){
        all_local_values=[];
    }
    else{
        all_local_values=JSON.parse(localStorage.getItem('all_local_values'));
    }

    all_local_values.forEach(function (local_value,index){
        if(local_value==removed_li.textContent){
            all_local_values.splice(index,1);
        }
    })
    localStorage.setItem('all_local_values',JSON.stringify(all_local_values));
}



// remove_all_tasls

function remove_all_tasls(e){
   
    if(list_group.childNodes.length==1){
        alert('you dont have any task');
    }
    else{
        if(confirm('are you sure to delete all tasks??')){
            list_group.innerHTML=''
            localStorage.clear();
        }
    }
    e.preventDefault();
}



// check_word

function check_word(e){
    let filter_word=e.target.value.toLowerCase();
    console.log(filter_word);

    document.querySelectorAll('.list-group-item').forEach(function (all_li){
        let all_li_value=all_li.textContent.toLowerCase();
        if(all_li_value.indexOf(filter_word) !=-1){
            all_li.classList.add('d-flex');
        }
        else{
            all_li.classList.remove('d-flex');
            all_li.style.display='none';
        }
    })
}
