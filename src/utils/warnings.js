export const describeRoles = value => {
  let warnings = []
  if (value.includes(2)) { warnings.push('You will have the chance to highlight what food products you sell.')}
  if (value.includes(1)) { warnings.push('You will have the chance to highlight what food products you buy.')}
  if (value.includes(5)) { warnings.push('You will have the chance to highlight what processing services you offer.') }
  if (value.includes(3)) { warnings.push('You will have the chance to highlight the services you provide to the Ontario food industry.')}
  if (value.includes(4)) { warnings.push('You will have the chance to connect with businesses and list them on your profile.')}
  if (value.includes(6)) { warnings.push('You will have the chance to highlight what food products you vend.')}
  return warnings
}

export const describeEditRoles = value => {
  let warnings = []
  if (value.includes(1)) { warnings.push('You can highlight which Ontario food products you are looking to buy.')}
  if (value.includes(2)) { warnings.push('You can highlight which Ontario food products you are looking to sell.')}
  if (value.includes(5)) { warnings.push('You can highlight what food processing services you offer to Ontario businesses.')}
  if (value.includes(3)) { warnings.push('You can highlight how your services benefit the Ontario food sector.')}
  if (value.includes(4)) { warnings.push('You will be able to connect with businesses and list them on your profile.')}
  if (value.includes(6)) { warnings.push('You can highlight which Ontario food products you are looking to vend.')}
  return warnings
}

export const describeBusinessSizes = value => {
  let warnings = []
  if (value.includes('SML')) { warnings.push('Small (I buy for a small restaurant, caterer, or a farmers\' markets)')}
  if (value.includes('MED')) { warnings.push('Medium (I buy for a large restaurant, caterer, specialty or independent retailer, or small distributor)')}
  if (value.includes('LRG')) { warnings.push('Large (I buy for an institution, grocery chain, large distributor, or food service company)')}
  return warnings
}

export const describeSellerBusinessSizes = value => {
  let warnings = []
  if (value.includes('SML')) { warnings.push('Small (I sell to small restaurants, caterers, or a farmers\' markets, and/or at farm-gate)') }
  if (value.includes('MED')) { warnings.push('Medium (I sell to large restaurants, caterers, specialty and independent retailers, and/or small distributors)') }
  if (value.includes('LRG')) { warnings.push('Large (I sell to institutions, major grocery chains, large distributors, and/or food service companies)') }
  return warnings
}

export const describeProcessorBusinessSizes = value => {
  let warnings = []
  if (value.includes('SML')) { warnings.push('Small (I process for small restaurants, caterers, farmers\' markets and/or at farm-gate)') }
  if (value.includes('MED')) { warnings.push('Medium (I process for large restaurants, caterers, specialty and independent retailers, and small distributors)') }
  if (value.includes('LRG')) { warnings.push('Large (I process for institutions, grocery chains, large distributors, and food service companies)') }
  return warnings
}
