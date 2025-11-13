import Item from '../models/item.model.js'

export const createItem = async (req, res) => {
  try {
    const item = await Item.create({
      ...req.body,
      createdBy: req.user._id,
    })

    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const getItems = async (req, res) => {
  try {
    const { search = '', page = 1, limit = 5 } = req.query

    const query = {
      createdBy: req.user._id,
      title: { $regex: search, $options: 'i' },
    }

    const items = await Item.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit))

    const count = await Item.countDocuments(query)

    res.json({
      items,
      totalPages: Math.ceil(count / limit),
      currentPage: Number(page),
    })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const updateItem = async (req, res) => {
  try {
    const item = await Item.findOneAndUpdate(
      { _id: req.params.id, createdBy: req.user._id },
      req.body,
      { new: true }
    )

    res.json(item)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export const deleteItem = async (req, res) => {
  try {
    await Item.findOneAndDelete({
      _id: req.params.id,
      createdBy: req.user._id,
    })

    res.json({ message: 'Item deleted' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
