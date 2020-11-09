/**
 * @jest-environment ./ServerEnvironment
 */

const {connectDB, disconnectDB} = require('../../server/config/db');
const firebase = require('../../client/node_modules/firebase');
const firebaseConfig = require('../../client/src/utils/firebaseConfig').firebaseConfig;
const FormData = require('form-data');

let token, portfolio_id, item_id, image_id, filename;

beforeAll(async () => {
    connectDB();
    firebase.initializeApp(firebaseConfig);
    await firebase.auth().signInWithEmailAndPassword('quaranteamjesttest@gmail.com', 'quaranteam').then(async () => {
        await firebase.auth().currentUser.getIdToken(true)
        .then(function (idToken){
            token = idToken;
        });
    });

    // Create a portfolio to test with
    const portfolioRes = await global.app
        .post('/api/portfolio/')
        .set('x-auth-token', token)
        .send({
            name: 'Jest testing page portfolio',
            template: 'blank',
            private: false
        });

    portfolio_id = portfolioRes.body._id;

    const itemRes = await global.app
        .post('/api/item')
        .set('x-auth-token', token)
        .send({
            portfolio: portfolio_id,
            pagename: 'Home',
            private: false,
            title: 'Jest created this to test comments on it',
            subtitle: 'This is part of the automated testing',
            paragraph: 'If this appears on the frontend, it means that teardown was not properly completed',
            mediaLink: '',
            mediaType: '',
            linkText: '',
            linkAddress: '',
            row: 0,
            column: 0
        });
    item_id = itemRes.body._id;
});

afterAll(async () => {
    // Delete portfolio created in beforeAll()
    await global.app
        .delete('/api/portfolio/delete/'+portfolio_id)
        .set('x-auth-token', token);
    await disconnectDB();
    await firebase.auth().signOut();
    await firebase.app().delete();
    // prevent open handle error
    await new Promise(resolve => setTimeout(() => resolve(), 1000));
});

let file =  require('../../client/src/images/Quaranteam.png');

it('Upload an image', async () => {
    console.log(file);
    let data = new FormData();
    data.append('file', file);
    const res = await global.app
        .post('/api/media')
        .set('accept', 'application/json')
        .set('Accept-Language', 'en-US,en;q=0.8')
        .set('Content=Type', `multipart/form-data; boundary=${data._boundary}`)
        .set('x-auth-token', token)
        .send(data);
    expect(res.status).toBe(200);
    filename = res.body;
});

it('Get image file', async () => {
    const res = await global.app
        .get('/api/media/'+filename);
    expect(res.status).toBe(200);
    image_id = res.body._id;
});

it('Display image', async () => {
    const res = await global.app
        .get('/api/media/image/'+filename);
    expect(res.status).toBe(200);
});

it('Delete image', async () => {
    const res = await global.app
        .delete('/api/media/'+image_id)
        .set('x-auth-token', token);
    expect(res.status).toBe(200);
});