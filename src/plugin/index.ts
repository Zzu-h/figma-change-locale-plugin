figma.showUI(__html__);

function showToast(message: string, duration: number = 2000): void {
    // Send a message to the UI to trigger the showToast function
    figma.ui.postMessage({ type: 'showToast', message, duration });
}

// Set up a listener for messages from the UI
figma.ui.onmessage = (message) => {
    if (message.type === 'showToast') {
        // Handle the message from the UI if needed
        showToast(message.message, message.duration);
        console.log('call onmessage')
    }
};

export{showToast};