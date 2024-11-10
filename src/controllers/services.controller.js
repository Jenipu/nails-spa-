import { ServiceModel, WorkerServicesModel, RatingModel } from '../my-models/index.js'
import { RatingsService } from '../services/index.js'

export const getServices = async (req, res) => {
  const services = await ServiceModel.findAll()

  res.json({data: services})
}

export const getServicesAppointments = async (req, res) => {
  try {
    const { default: userModel} = await import('../my-models/user.model.js')
    const { default: serviceModel} = await import('../my-models/service.model.js')
    const services = await WorkerServicesModel.findAll({
      include: [
        {
          model: userModel,
          as: 'worker',
          attributes: {
            exclude: ['password']
          }
        },
        {
          model: serviceModel,
          as: 'service'
        }
      ]
    })

    res.json({ status: "success", data: services })

  } catch (error) {
    console.log(error)
    res.status(500).json({
      status: "error",
      error: {
        code: "97a7dd76-abff-46ea-955c-63d9fe49f6a0",
        message: 'Internal server error!.'
      }
    })
  }
}

export const getService = async (req, res) => {
  const { id } = req.params

  const serviceFound = await ServiceModel.findByPk(id)

  if (!serviceFound) {
    return res.status(404).json({message: 'User not found!'})
  }

  res.json({data: serviceFound})
}

export const createService = async (req, res) => {
  try {
    const { body } = req

    const createdService = await ServiceModel.create(body)

    res.json({data: createdService})

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}

export const createServiceRating = async (req, res) => {
  try {
    const { body, params } = req
    const { id } = params

    let sanitizedScore
    if (body.score < 0 || body.score > 5) {
      sanitizedScore = 5
    } else {
      sanitizedScore = body.score
    }

    const newRating = {
      ...body,
      score: sanitizedScore,
      service_id: id
    }

    await RatingModel.create(newRating)

    const options = {
      where: {
        service_id: id
      }
    }
    const serviceRatings = await RatingsService.getRatingsWithOptions(options)

    const serviceTotalRating = serviceRatings.map(rating => Number(rating.score)).reduce((acc, curr) => acc + curr)
    const absServiceTotalRating = Math.floor(Math.abs(serviceTotalRating / serviceRatings.length))

    const serviceFound = await ServiceModel.findByPk(id)
    const updatedService = await serviceFound.update({ rating: absServiceTotalRating })

    res.json({status: "success", data: updatedService})

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}

export const updateService = async (req, res) => {
  try {
    const { body, params } = req
    const { id } = params

    const serviceFound = await ServiceModel.findByPk(id)

    if (!serviceFound) {
      return res.status(404).json({
        message: 'No service found!.'
      })
    }

    const updatedService = serviceFound.update(body)

    res.json({data: updatedService})

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}

export const deleteService = async (req, res) => {
  res.json({data: 'deleteService'})
}

export const removeService = async (req, res) => {
  try {
    const { id } = req.params

    const serviceFound = await ServiceModel.findByPk(id)

    if (!serviceFound) {
      return res.status(404).json({
        message: 'No service found!.'
      })
    }

    await serviceFound.destroy()

    res.json({message: 'Service removed!.'})

  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'Internal server error!.'
    })
  }
}