import * as jweetRepository from '../data/jweets';

export async function getJwitters(req, res) {
  const username = req.query.username;
  const data = await (username
    ? jweetRepository.getAllByUsername(username)
    : jweetRepository.getAll());
  res.status(200).json(data);
}

export async function getJwitter(req, res, next) {
  const id = req.params.id;
  const tweet = await jweetRepository.getById(id);
  if (tweet) {
    res.status(200).json(tweet);
  } else {
    res.status(404).json({ message: `Tweet id(${id}) not found` });
  }
}

export async function postJwitter(req, res, next) {
  const { text } = req.body;
  const tweet = await jweetRepository.create(text, req.userId);
  res.status(201).json(tweet);
}

export async function putJwitter(req, res, next) {
  const id = req.params.id;
  const text = req.body.text;
  const tweet = await jweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  const updated = await jweetRepository.update(id, text);
  res.status(200).json(updated);
}

export async function deleteJwitter(req, res, next) {
  const id = req.params.id;
  const tweet = await jweetRepository.getById(id);
  if (!tweet) {
    return res.status(404).json({ message: `Tweet not found: ${id}` });
  }
  if (tweet.userId !== req.userId) {
    return res.sendStatus(403);
  }
  await jweetRepository.remove(id);
  res.sendStatus(204);
}
