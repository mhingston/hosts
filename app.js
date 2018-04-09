#!/usr/bin/env node

const os = require('os')
const path = require('path');
const fs = require('await-fs');
const request = require('request-promise-native');

const main = async () =>
{
    const hosts = {};
    const sources = (await fs.readFile(path.join(__dirname, 'sources.txt'), 'utf8')).split(os.EOL);

    for(let source of sources)
    {
        source = source.trim();

        if(!source)
        {
            break;
        }

        try
        {
            let response;

            if(/^(?:https?)?(?:file?)?:\/\//.test(source))
            {
                response = await request.get(source);
            }

            else
            {
                response = path.isAbsolute(source) ? await fs.readFile(source, 'utf8') : await fs.readFile(path.join(__dirname, source), 'utf8');
            }

            const lines = response.split(os.EOL);

            for(let line of lines)
            {
                line = line.trim();

                if(line && !line.startsWith('#'))
                {
                    const [ip, host] = line.split(/\s+/);
                    hosts[host] = ip;
                } 
            };
        }

        catch(error)
        {
            console.log(`Unable to fetch from: ${source}.\n\t${error.message}`);
        }
    };

    let output = '';

    for(const [host, ip] of Object.entries(hosts))
    {
        output += `${ip} ${host}${os.EOL}`;
    };

    const fileName = path.isAbsolute(process.argv[2]) ? process.argv[2] : path.join(process.cwd(), process.argv[2]);

    try
    {
        await fs.rename(fileName, `${fileName}.old`);
    }

    catch(error)
    {

    }

    await fs.writeFile(fileName, output);
}

main();
