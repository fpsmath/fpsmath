const { getObject } = require('../../array');
const commando = require('discord.js-commando');
module.exports = class sensCommand extends commando.Command {
  constructor(client) {
    super(client, {
      name: 'sens',
      aliases: ['sens-cm', 'sens-deg', 'sens-inch'],
      group: 'math',
      memberName: 'sens',
      description:
        'Converts cm/360(default), deg/mm or inch/360 to a game sensitivity',
      details:
        'Converts cm/360(default), deg/mm or inch/360 to a game sensitivity \nTo see the Supported games do /games',
      examples: [
        '`/sens 28.5 quake 1600`',
        '`/sens 28.5 ow 1600 -cm`',
        '`/sens 1.21 cs 1600 -deg`',
        '`/sens 11.22 fortnite 1600 -inch`',
      ],
      format:
        '<cm/360|deg/mm|inch/360> <game|yaw> <cpi> ["-cm"|"-deg"|"-inch"]',

      args: [
        {
          key: 'cm',
          prompt: 'What cm/360 do you want to convert from',
          type: 'float',
        },
        {
          key: 'yawv',
          label: 'Game or yaw value',
          prompt: 'What game or yaw value do you want to use',
          type: 'gamename|float',
        },
        {
          key: 'cpi',
          label: 'cpi/dpi',
          prompt: 'What CPI/DPI do you want to use',
          type: 'float',
        },
        {
          key: 'flags',
          prompt: '',
          default: '-cm',
          type: 'string',
        },
      ],
    });
  }

  run(message, args) {
    console.log(args.flags);
    switch (args.flags) {
      case '-deg': {
        const output = (
          (24.5 * args.cm) /
          (args.cpi * getObject(args.yawv.toLowerCase(), 'yaw'))
        ).toFixed(2);
        console.log(output);
        message.say(output);
        break;
      }

      case '-inch': {
        const output = (
          360 /
          (args.cpi * getObject(args.yawv.toLowerCase(), 'yaw') * args.cm)
        ).toFixed(2);
        message.say(output);
        break;
      }

      case '-cm': {
        const output = (
          (2.54 * 360) /
          (args.cpi * getObject(args.yawv.toLowerCase(), 'yaw') * args.cm)
        ).toFixed(2);
        message.say(output);
      }
    }
  }
};