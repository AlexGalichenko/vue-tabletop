export function frontCardStyle(object) {
  return {
    'height': `${object.height}px`,
    'width': `${object.width}px`,
    'background-image': `url(${object.frontUrl})`,
    'background-size': `${object.columns * 100}% ${object.rows * 100}%`,
    'background-position': `${((object.column - 1) / (object.columns - 1)) * 100}% ${((object.row - 1) / (object.rows - 1)) * 100}%`,
    'z-index': object.z
  }
}

export function backCardStyle(object) {
  return {
    'height': `${object.height}px`,
    'width': `${object.width}px`,
    'background-image': `url(${object.backUrl})`,
    'background-size': `100% 100%`,
    'z-index': object.z
  }
}

export function optimizedFrontCardStyle(object) {
  return {
    ...frontCardStyle(object),
    'will-change': 'transform',
    'transform': `translate(${object.x}px, ${object.y}px) translateZ(0)`,
  }
}

export function optimizedBackCardStyle(object) {
  return {
    ...backCardStyle(object),
    'will-change': 'transform',
    'transform': `translate(${object.x}px, ${object.y}px) translateZ(0)`
  }
}

export function previewFrontCardStyle(object) {
  return {
    ...frontCardStyle(object),
    'height': `${object.height * 2}px`,
    'width': `${object.width * 2}px`
  }
}

export function previewBackCardStyle(object) {
  return {
    ...backCardStyle(object),
    'height': `${object.height * 2}px`,
    'width': `${object.width * 2}px`
  }
}


export function frontTileStyle(object) {
  return {
    ...frontCardStyle(object),
    'background-size': `100% 100%`,
    'background-position': `0 0`,
    'will-change': 'transform',
    'transform': `translate(${object.x}px, ${object.y}px) translateZ(0)`
  }
}

export function backTileStyle(object) {
  return {
    ...backCardStyle(object),
    'background-size': `100% 100%`,
    'background-position': `0 0`,
    'will-change': 'transform',
    'transform': `translate(${object.x}px, ${object.y}px) translateZ(0)`
  }
}

export function previewFrontTileStyle(object) {
  return {
    ...frontCardStyle(object),
    'background-size': `100% 100%`,
    'background-position': `0 0`,
    'height': `${object.height * 2}px`,
    'width': `${object.width * 2}px`
  }
}

export function previewBackTileStyle(object) {
  return {
    ...backCardStyle(object),
    'background-size': `100% 100%`,
    'background-position': `0 0`,
    'height': `${object.height * 2}px`,
    'width': `${object.width * 2}px`
  }
}