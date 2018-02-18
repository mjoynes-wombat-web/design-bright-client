// Returns a string describing how much time is remaining in the campaign.
// const campaignTimeLeft = (isEnded, campaignInfo) => {
//   if (isEnded()) {
//     return 'This campaign has ended.';
//   } else if (campaignInfo.startDate === null) {
//     return 'This campaign hasn\'t started yet.';
//   } else if (campaignInfo.timeRemaining > 1) {
//     return `${Math.round(campaignInfo.timeRemaining)} Days Left`;
//   } else if ((campaignInfo.timeRemaining * 24) > 1) {
//     return `${Math.round(campaignInfo.timeRemaining * 24)} Hours Left`;
//   }
//   return 'Less than an Hour left';
// };

const campaignTimeLeft = (campaignInfo) => {
  const isEnded = endDate => ((new Date(Date.parse(endDate))).getTime()
    <= (new Date()).getTime());
  const campaign = campaignInfo;
  campaign.timeRemaining = (
    (new Date(Date.parse(campaign.endDate)) - Date.parse(new Date())) / 1000 / 60 / 60 / 24
  );

  if (isEnded(campaignInfo.endDate)) {
    return 'This campaign has ended.';
  } else if (campaignInfo.startDate === null) {
    return 'This campaign hasn\'t started yet.';
  } else if (campaignInfo.timeRemaining > 1) {
    return `${Math.round(campaignInfo.timeRemaining)} Days Left`;
  } else if ((campaignInfo.timeRemaining * 24) > 1) {
    return `${Math.round(campaignInfo.timeRemaining * 24)} Hours Left`;
  }
  return 'Less than an Hour left';
};

export default campaignTimeLeft;
