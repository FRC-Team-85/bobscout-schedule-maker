var tba = require('tba-api-client')
var client = new tba.API(process.env.TBA_API_KEY)
var fs = require('fs')

console.log('Searching for event: ', process.argv[2])

var writeStream = fs.createWriteStream('schedule.csv')
writeStream.write('Match,Red 1,Red 2,Red 3,Blue 1,Blue 2,Blue 3\n')
client.EventMatches(process.argv[2]).then(matches => {
  //console.log(matches)
  matches.sort(function(a, b) {
      return a.match_number - b.match_number
    }).forEach(function(match) {
    var outputLine = match.match_number
    console.log('Match: ', match.match_number)
    console.log('  Red:')
    match.alliances.red.team_keys.forEach(function(team) {
      outputLine = outputLine + ',' + team.substring(3)
      console.log('    ', team.substring(3))
    });
    console.log('  Blue: ')
    match.alliances.blue.team_keys.forEach(function(team) {
      outputLine = outputLine + ',' + team.substring(3)
      console.log('    ', team.substring(3))
    });
    console.log('  CSV line: ', outputLine)
    writeStream.write(outputLine + '\n')
  });
}).then(function() { writeStream.end() }).catch(console.error)
