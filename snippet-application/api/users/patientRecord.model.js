const mongoose = require('mongoose');

const recordsSchema = new mongoose.Schema( 
  {
    user_id :{
        type : String
    },
    baselineValue: {
      type: Number,
      required: true
    },
    accelerations: {
      type: Number,
      required: true
    },
    fetalMovement: {
      type: Number,
      required: true
    },
    uterineContractions: {
      type: Number,
      required: true
    },
    lightDecelerations: {
      type: Number,
      required: true
    },
    severeDecelerations: {
      type: Number,
      required: true
    },
    prolonguedDecelerations: {
      type: Number,
      required: true
    },
    abnormalShortTermVariability: {
      type: Number,
      required: true
    },
    meanValueOfShortTermVariability: {
      type: Number,
      required: true
    },
    percentageOfTimeWithAbnormalLongTermVariability: {
      type: Number,
      required: true
    },
    meanValueOfLongTermVariability: {
      type: Number,
      required: true
    },
    histogramWidth: {
      type: Number,
      required: true
    },
    histogramMax: {
      type: Number,
      required: true
    },
    histogramNumberOfPeaks: {
      type: Number,
      required: true
    },
    histogramNumberOfZeroes: {
      type: Number,
      required: true
    },
    
    histogramMedian: {
      type: Number,
      required: true
    },
    histogramVariance: {
      type: Number,
      required: true
    },
    histogramTendency: {
      type: Number,
      required: true
    },
    fetalHealth: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true, // Add createdAt and updatedAt fields
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

const Record = mongoose.model('Record', recordsSchema);

module.exports = Record;


