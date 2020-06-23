import * as log from "https://deno.land/std/log/mod.ts";
import * as  _ from "https://deno.land/x/deno_lodash/mod.ts";

interface Launch {
  flightNumber: number;
  mission: string;
  rocket: string,
  customers: Array<string>
}

const launches = new Map<number, Launch>();

async function downloadLaunchData() {
  log.info("dowloading...");
  const response = await fetch("https://api.spacexdata.com/v3/launches", {
    method: "GET",
  });
  if (!response.ok) {
    log.warning("problem");
    throw new Error("download failed");
  }
  const data = await response.json();
  for (let launch of data) {
      const payloads = launch["rocket"]["second_stage"]["payloads"]
      const customers = _.default.flatMap(payloads, (payload: any) => {
          return payload["customers"]
      })
      const flightData = {
          flightNumber: launch["flight_number"],
          mission: launch["mission_name"],
          rocket: launch["rocket"]['rocket_name'],
          customer: customers
      }
      launches.set(flightData.flightNumber, flightData.mission)
      console.log (flightData)
    }
    log.info(`downloaded ${launches.size}`)
}

console.log( await launches)
downloadLaunchData();
