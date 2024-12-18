export const chordMap = {
  Ab: 0,
  A: 1,
  'A#': 2,
  Bb: 2,
  B: 3,
  C: 4,
  'C#': 5,
  Db: 5,
  D: 6,
  'D#': 7,
  Eb: 7,
  E: 8,
  F: 9,
  'F#': 10,
  Gb: 10,
  G: 11,
  'G#': 12,
};

export const changeTone = (part, targetTone) => {
  if (
    !part.lines ||
    part.lines.length === 0 ||
    part.lines[0].chords.length === 0
  ) {
    throw new Error('Cannot determine current tone: no chords found');
  }

  const firstChord = part.lines[0].chords[0];
  const currentTone = extractBaseChord(firstChord);
  const currentToneIndex = chordMap[currentTone];
  const targetToneIndex = chordMap[targetTone];

  if (currentToneIndex === undefined || targetToneIndex === undefined) {
    throw new Error('Invalid tone provided');
  }

  const steps = targetToneIndex - currentToneIndex;

  const changedLines = part.lines.map((line) => ({
    text: line.text,
    chords: line.chords.map((chord) =>
      changeChord(chord, steps, targetTone, firstChord)
    ),
  }));

  return {
    id: part.id,
    lines: changedLines,
  };
};

const changeChord = (chord, steps, targetTone, firstChord) => {
  const chordParts = chord.split('/');

  const changedChords = chordParts.map((part) => {
    const baseChord = extractBaseChord(part);
    const modifier = part.slice(baseChord.length);

    const currentIndex = chordMap[baseChord];
    if (currentIndex === undefined) {
      return part;
    }

    let newIndex = (currentIndex + steps + 12) % 12;
    if (newIndex === 0) {
      return (targetTone.includes('#') ? 'G#' : 'Ab') + modifier;
    }

    const possibleChords = Object.keys(chordMap).filter(
      (key) => chordMap[key] === newIndex
    );

    let newChord = possibleChords[0];
    if (targetTone.includes('b') && possibleChords.length > 1) {
      newChord = possibleChords[1];
    }

    if (
      firstChord.includes('m') &&
      !targetTone.includes('#') &&
      possibleChords.length > 1
    ) {
      newChord = possibleChords[1];
    }

    return newChord + modifier;
  });

  return changedChords.join('/');
};

const extractBaseChord = (chord) => {
  if (chord[1] === 'b' || chord[1] === '#') {
    return chord.slice(0, 2);
  }
  return chord[0];
};
