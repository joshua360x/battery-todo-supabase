const SUPABASE_URL = 'https://gxwgjhfyrlwiqakdeamc.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYzNjQxMTMxMiwiZXhwIjoxOTUxOTg3MzEyfQ.PHekiwfLxT73qQsLklp0QFEfNx9NlmkssJFDnlvNIcA';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export async function createTodo(todo){
    // create a single incomplete todo with the correct 'todo' property for this user in supabase
    const response = await client
        .from('todos')
        .insert([{ todo }])
        .single();
    return checkError(response);
}

export async function deleteAllTodos() {
    const user = await getUser();
    // delete all todos for this user in supabase
    const response = await client
        .from('todos')
        .delete()
        .match({ user_id: user.user.id });
    return checkError(response);
}

export async function getTodos() {
    // get all todos for this user from supabase
    // by using select we are able to grab all the elements at once
    const response = await client
        .from('todos')
        .select()
        .order('id');
    return checkError(response);    
}

export async function completeTodo(id) {
    // find the and update (set complete to true), the todo that matches the correct id
    // when we complete the todo this is an update and within the update we need to reflect in the database and we can make more adjustments later to reflect the front-end
    const response = await client
        .from('todos')
        .update([{ complete: true }])
        .match({ id:id });
    return checkError(response);    
}



export async function getUser() {
    return client.auth.session();
}


export async function checkAuth() {
    const user = await getUser();

    if (!user) location.replace('../'); 
}

export async function redirectIfLoggedIn() {
    if (await getUser()) {
        location.replace('./todos');
    }
}

export async function signupUser(email, password){
    const response = await client.auth.signUp({ email, password });
    
    return checkSignUpError(response);
}

export async function signInUser(email, password){
    const response = await client.auth.signIn({ email, password });

    return checkSignUpError(response);
}

export async function logout() {
    await client.auth.signOut();

    return window.location.href = '../';
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}

function checkSignUpError({ user, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : user;
}
