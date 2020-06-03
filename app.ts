import { Drash } from "https://deno.land/x/drash/mod.ts";
import { HeroList, HeroElement } from "./hero.ts";

// globals
const port = 1337;

// Instance
const server = new Drash.Http.Server({
  response_output: "application/json",
  resources: [HeroList, HeroElement],
  logger: new Drash.CoreLoggers.ConsoleLogger({
    enabled: true,
    level: "all",
    tag_string: "{datetime} | {level} |",
    tag_string_fns: {
      datetime() {
        return new Date().toISOString().replace("T", " ");
      },
    },
  }),
});

// Run
server.run({
  hostname: "localhost",
  port: port,
});

console.log("Deno server running on port " + port);
