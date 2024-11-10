import RatingModel from '../my-models/rating.model.js'

const getRatingsWithOptions = async (options = []) => {
  try {
    const ratingsFound = await RatingModel.findAll(options)

    return ratingsFound

  } catch (error) {
    throw new Error('[RATINGS SERVICE] getRatingsWithOptions')
  }
}

export default {
  getRatingsWithOptions,
}