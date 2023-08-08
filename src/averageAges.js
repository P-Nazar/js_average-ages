'use strict';

/**
 * Implement calculateMenAverageAge function
 *
 * Function returns average age of men in array. If `century` is specified then
 * function calculates average age only for men who died in this century
 *
 * To calculate century:
 * Divide year of person's death by 100: Math.ceil(person.died / 100)
 *
 * @param {object[]} people
 * @param {number} century - optional
 *
 * @return {number}
 */
function calculateMenAverageAge(people, century = 0) {
  let totalAge = 0;
  let menCount = 0;

  people.forEach(person => {
    if (person.sex
      === 'm' && (century === 0 || Math.ceil(person.died / 100) === century)) {
      totalAge += person.died - person.born;
      menCount++;
    }
  });

  const averageAge = menCount > 0 ? totalAge / menCount : 0;

  return averageAge;
}

/**
 * Implement calculateWomenAverageAge function
 *
 * Function returns average age of women in array. If `withChildren` is
 * specified then function calculates average age only for women with children
 *
 * Hint: To check if a woman has children you should find someone who mention
 * her as mother.
 *
 * @param {object[]} people
 * @param {boolean} withChildren - optional
 *
 * @return {number}
 */
function calculateWomenAverageAge(people, withChildren = false) {
  let totalAge = 0;
  let womenCount = 0;

  people.forEach(person => {
    function hasChildren(persons) {
      return people.some(otherPerson => otherPerson.mother === person.name);
    }

    if (person.sex
      === 'f' && (withChildren === false || hasChildren(person))) {
      totalAge += person.died - person.born;
      womenCount++;
    }
  });

  const averageAge = womenCount > 0 ? totalAge / womenCount : 0;

  return averageAge;
}

/**
 * Implement calculateAverageAgeDiff function.
 *
 * The function returns an average age difference between a child and his or her
 * mother in the array. (A mother's age at child birth)
 *
 * If `onlyWithSon` is specified then function calculates age difference only
 * for sons and their mothers.
 *
 * @param {object[]} people
 * @param {boolean} onlyWithSon - optional
 *
 * @return {number}
 */
function calculateAverageAgeDiff(people, onlyWithSon) {
  const children = people.filter(person => people.find(
    mother => mother.name === person.mother)
   && (onlyWithSon ? person.sex === 'm' : true));

  const ageDiff = children.map(child => {
    const mother = people.find(person => child.mother === person.name);

    return child.born - mother.born;
  });

  const averageAgeDiff = ageDiff.reduce((sum, el) => {
    return sum + el;
  }, 0);

  return averageAgeDiff / children.length;
}

module.exports = {
  calculateMenAverageAge,
  calculateWomenAverageAge,
  calculateAverageAgeDiff,
};
