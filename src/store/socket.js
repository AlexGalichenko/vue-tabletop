import io from 'socket.io-client';
const socket = io.connect(`http://localhost:${process.env.PORT || 8000}`);
export default socket;