import fs from 'fs/promises';
import { createReadStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import csv from 'csv-parser';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createMarkdownContent(player) {
  const frontMatter = [
    '---',
    `key: ${player.key}`,
    `name: "${player['person.name'].replace(/'/g, '')}"`,
    `overallRank: ${player.overallRank}`,
    `consensusOverallRank: ${player.consensusOverallRank}`,
    `positionAbbreviation: ${player.positionAbbreviation}`,
    `stateAbbreviation: ${player.stateAbbreviation}`,
    `stateRank: ${player.stateRank}`,
    `positionRank: ${player.positionRank}`,
    `consensusStateRank: ${player.consensusStateRank}`,
    `consensusPositionRank: ${player.consensusPositionRank}`,
    `nilValue: ${player.nilValue}`,
    `stars: ${player.stars}`,
    `classYear: ${player.classYear}`,
    `rankingYear: ${player.rankingYear}`,
    `person.highSchoolName: "${player['person.highSchoolName']}"`,
    `person.homeTownName: "${player['person.homeTownName']}"`,
    `person.formattedHeight: "${player['person.formattedHeight']}"`,
    `person.weight: ${player['person.weight']}`,
    `person.age: ${player['person.age']}`,
    `person.defaultAssetUrl: "${player['person.defaultAssetUrl']}"`,
    `person.status.isCommitted: ${player['person.status.isCommitted']}`,
    `person.status.isSigned: ${player['person.status.isSigned']}`,
    `person.status.isTransfer: ${player['person.status.isTransfer']}`,
    `person.status.isEnrolled: ${player['person.status.isEnrolled']}`,
    `person.status.commitmentDate: "${player['person.status.commitmentDate']}"`,
    `person.status.committedOrganizationSlug: "${player['person.status.committedOrganizationSlug']}"`,
    `person.status.committedOrganizationAssetUrl: "${player['person.status.committedOrganizationAssetUrl']}"`,
    `person.status.committedOrganizationPrimaryColor: "${player['person.status.committedOrganizationPrimaryColor']}"`,
    `weightedAggregateScore: ${player.weightedAggregateScore}`,
    `industryStars: ${player.industryStars}`,
    `industryRating: ${player.industryRating}`,
    `industryStateRank: ${player.industryStateRank}`,
    `industryPositionRank: ${player.industryPositionRank}`,
    `industryOverallRank: ${player.industryOverallRank}`,
    `consensusStars: ${player.consensusStars}`,
    `consensusRating: ${player.consensusRating}`,
    `on3Stars: ${player.on3Stars}`,
    `on3Rating: ${player.on3Rating}`,
    `on3StateRank: ${player.on3StateRank}`,
    `on3PositionRank: ${player.on3PositionRank}`,
    `on3OverallRank: ${player.on3OverallRank}`,
    `twofoursevenStars: ${player.twofoursevenStars}`,
    `twofoursevenRating: ${player.twofoursevenRating}`,
    `twofoursevenStateRank: ${player.twofoursevenStateRank}`,
    `twofoursevenPositionRank: ${player.twofoursevenPositionRank}`,
    `twofoursevenOverallRank: ${player.twofoursevenOverallRank}`,
    `espnStars: ${player.espnStars}`,
    `espnRating: ${player.espnRating}`,
    `espnStateRank: ${player.espnStateRank}`,
    `espnPositionRank: ${player.espnPositionRank}`,
    `espnOverallRank: ${player.espnOverallRank}`,
    `rivalsStars: ${player.rivalsStars}`,
    `rivalsRating: ${player.rivalsRating}`,
    `rivalsStateRank: ${player.rivalsStateRank}`,
    `rivalsPositionRank: ${player.rivalsPositionRank}`,
    `rivalsOverallRank: ${player.rivalsOverallRank}`,
    `prediction_1_organization: ${player.prediction_1_organization}`,
    `prediction_1_percent: ${player.prediction_1_percent}`,
    `prediction_1_committed: ${player.prediction_1_committed}`,
    `prediction_1_distance: ${player.prediction_1_distance}`,
    `prediction_2_organization: ${player.prediction_2_organization}`,
    `prediction_2_percent: ${player.prediction_2_percent}`,
    `prediction_2_committed: ${player.prediction_2_committed}`,
    `prediction_2_distance: ${player.prediction_2_distance}`,
    '---',
    '',
    `${player['person.name']} is a ${player.positionAbbreviation} prospect from ${player['person.homeTownName']}.`
  ].filter(Boolean).join('\n');

  return frontMatter;
}

async function generateMarkdownFiles(players) {
  const outputDir = path.join(__dirname, 'content', 'players');

  // Ensure the output directory exists
  await fs.mkdir(outputDir, { recursive: true });

  for (const player of players) {
    const content = createMarkdownContent(player);
    const fileName = `${player['person.name'].toLowerCase().replace(/\s+/g, '-').replace(/'/g, '')}.md`;
    const filePath = path.join(outputDir, fileName);

    await fs.writeFile(filePath, content);
    console.log(`Generated markdown for ${player['person.name'].replace(/'/g, '')}`);
  }
}

function readCSV(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (error) => reject(error));
  });
}

async function main() {
  try {
    const csvFilePath = path.join(__dirname, 'player_rankings.csv'); // Adjust this path as needed
    console.log('Reading CSV file...');
    const players = await readCSV(csvFilePath);
    console.log(`Read ${players.length} players from CSV.`);

    console.log('Generating markdown files...');
    await generateMarkdownFiles(players);
    console.log('All markdown files generated successfully');
  } catch (error) {
    console.error('Error:', error);
  }
}

main();