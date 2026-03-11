import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

export async function getArtistsByDate() {
    const result = await pb.collection('artistes').getFullList({ sort: 'date', expand: 'scene' });
    return result;
}

export async function getScenesByName() {
    const result = await pb.collection('scenes').getFullList({ sort: 'name', expand: 'artiste' });
    return result;
}

export async function getArtistsByName() {
    const result = await pb.collection('artistes').getFullList({ sort: 'name', expand: 'scene' });
    return result;
}

export async function getOneArtist(id) {
    const result = await pb.collection('artistes').getOne(id, { expand: 'scene' });
    return result;
}

export async function getOneScene(id) {
    const result = await pb.collection('scenes').getOne(id, { expand: 'artiste' });
    return result;
}

export async function getArtistsByScene(id) {
    const result = await pb.collection('artistes').getFullList({ filter: `scene = "${id}"` });
    console.log(id);
    return result;
}

export async function getArtistsBySceneName(name) {
    const result = await pb.collection('artistes').getFullList({ expand: 'scene', filter: `scene.name = "${name}"` });
    return result;
}

export async function getArtistsByGenre(genre) {
    const result = (genre === 'Tout') ? pb.collection('artistes').getFullList({ expand: 'scene' }) : pb.collection('artistes').getFullList({ filter: `genre = "${genre}"`, expand: 'scene' });
    return result;
}

export async function getImageUrl(record, recordImage, thumb) {
    return pb.files.getURL(record, recordImage, { thumb });
}

export function formatDate(date) {
    const options = {
        weekday: 'long', month: 'long', day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };
    const DateString = new Date(date).toLocaleDateString('fr-FR', options);
    return DateString;
}

export function formatDateNoHour(date) {
    const options = {
        weekday: 'long', month: 'long', day: 'numeric'
    };
    const DateString = new Date(date).toLocaleDateString('fr-FR', options);
    return DateString;
}

export function fortmatDateHour(date) {
    const options = {
        hour: '2-digit',
        minute: '2-digit'
    };
    const DateString = new Date(date).toLocaleTimeString('fr-FR', options);
    return DateString;
}

export async function editArtist(data, id) {
    return await pb.collection('artistes').update(id, data);
}

export async function createArtist(data) {

    return await pb.collection('artistes').create(data);
}

export async function editScene(data, id) {
    return await pb.collection('scenes').update(id, data);
}

export async function createScene(data) {

    return await pb.collection('scenes').create(data);
}

// --- AUTHENTIFICATION ---

export async function Userauth(login, mdp) {
    try {
        const authData = await pb.collection('users').authWithPassword(login, mdp);
        console.log("Utilisateur connecté :", pb.authStore.model.email);
        return authData;
    } catch (error) {
        console.error("Erreur de connexion :", error.message);
        return null;
    }
}

export async function createUser(email, password, passwordConfirm, name = "") {
    try {
        const data = {
            "email": email,
            "emailVisibility": true,
            "password": password,
            "passwordConfirm": passwordConfirm,
            "name": name
        };
        const record = await pb.collection('users').create(data);
        return record;
    } catch (error) {
        console.error("Erreur lors de la création de l'utilisateur :", error.message);
        return null;
    }
}

export function isLogged() {
    return pb.authStore.isValid;
}

export function logout() {
    pb.authStore.clear();
    console.log("Utilisateur déconnecté");
}

export function getUserInfo() {
    if (isLogged()) {
        return pb.authStore.model;
    }
    return null;
}