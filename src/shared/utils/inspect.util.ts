/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import util from 'util';

class InspectUtil {
  inspect(nick = 'INSPECT', data: any): void {
    console.log(
      nick,
      util.inspect(data, false, null, true /* enable colors */)
    );
  }
}

export { InspectUtil };
