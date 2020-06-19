import io from 'socket.io-client';
const socket = io.connect(window.location.host);
export default socket;