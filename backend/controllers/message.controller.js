import Message from '../models/message.model.js';

// Save new message
export const createMessage = async(req, res) => {
    try {
        const { projectId, sender, message } = req.body;

        if (!projectId || !sender || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newMessage = new Message({
            projectId,
            sender,
            message
        });

        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        console.error('Error creating message:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// Fetch messages for a project
export const getMessages = async(req, res) => {
    try {
        const { projectId } = req.params;

        const messages = await Message.find({ projectId }).sort({ createdAt: 1 });

        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};