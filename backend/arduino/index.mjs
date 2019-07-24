const sendInstruction = async socket => {
  socket.emit('FromAPI', 'hi'); // Emitting a new message. It will be consumed by the client
};

const sendToArduino = cmd => {
  console.log(`From client ${cmd}`);
};

export { sendInstruction, sendToArduino };
