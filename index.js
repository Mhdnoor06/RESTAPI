const fs = require('fs/promises');
const express = require('express');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/api/v3/app/events', async (req, res) => {
  const id = uuid();
  const name = req.body.name;
  const tagline = req.body.tagline;
  const schedule = req.body.schedule;
  const description = req.body.description;
  const moderator = req.body.moderator;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const rigorRank = req.body.rigorRank;

  const eventData = {
    id,
    name,
    tagline,
    schedule,
    description,
    moderator,
    category,
    subCategory,
    rigorRank,
  };

  console.log(eventData);

  await fs.mkdir('data/comments', { recursive: true });

  try {
    const data = await fs.readFile('data/comments/events.json', 'utf8');
    let events = [];

    if (data) {
      events = JSON.parse(data);
    }

    events.push(eventData);

    await fs.writeFile(
      'data/comments/events.json',
      JSON.stringify(events, null, 2),
    );

    res.json({ message: 'Event created successfully', id: id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error saving event data' });
  }
});

app.get('/api/v3/app/events/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const rawData = await fs.readFile('data/comments/events.json');
    const events = JSON.parse(rawData);
    const eventData = events.find((event) => event.id === id);

    if (eventData) {
      res.json(eventData);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving event data' });
  }
});

// http://localhost:3000/api/v3/app/events?page=1&limit=5

app.get('/api/v3/app/events', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const rawData = await fs.readFile('data/comments/events.json');
    const events = JSON.parse(rawData);

    // Sort events by recency (assuming the events have a date property)
    const sortedEvents = events.sort(
      (a, b) => new Date(a.schedule) - new Date(b.schedule),
    );

    // Paginate results
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedEvents = sortedEvents.slice(startIndex, endIndex);

    res.json(paginatedEvents);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving events data' });
  }
});

// http://localhost:3000/api/v3/app/events/343bdd19-1101-45e6-bf87-589109cba9e6

app.put('/api/v3/app/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const updatedEvent = req.body;

    const rawData = await fs.readFile('data/comments/events.json');
    const events = JSON.parse(rawData);

    // Find the index of the event to update
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update the event at the specified index
    events[eventIndex] = {
      ...events[eventIndex],
      ...updatedEvent,
    };

    // Write the updated events array back to the file
    await fs.writeFile('data/comments/events.json', JSON.stringify(events));

    res.json({ message: 'Event updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating event' });
  }
});

app.delete('/api/v3/app/events/:id', async (req, res) => {
  try {
    const eventId = req.params.id;

    const rawData = await fs.readFile('data/comments/events.json');
    let events = JSON.parse(rawData);

    // Find the index of the event to delete
    const eventIndex = events.findIndex((event) => event.id === eventId);

    if (eventIndex === -1) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Remove the event from the events array
    events.splice(eventIndex, 1);

    // Write the updated events array back to the file
    await fs.writeFile('data/comments/events.json', JSON.stringify(events));

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting event' });
  }
});

app.listen(3000, () => console.log('API Server is running...'));
