import { Cli } from "./cli";
import chalk from "chalk";

if (require.main === module) {
  const cli = new Cli();
  cli.run().catch((error) => {
    console.error(chalk.red("Unexpected error:", error));
    process.exit(1);
  });
}
