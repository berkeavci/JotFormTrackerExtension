import { fromEvent, merge, combineLatest} from "rxjs";
import {
  distinctUntilChanged,
  filter,
} from "rxjs/operators";

function shortcut(shortcut) {
    console.log(shortcut);
    // Observables for all keydown and keyup events
    const keyDown$ = fromEvent(document, "keydown");
    const keyUp$ = fromEvent(document, "keyup");
    // All KeyboardEvents - emitted only when KeyboardEvent changes (key or type)
    const keyEvents$ = merge(keyDown$, keyUp$);
    keyEvents$.pipe(
      distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type)
    );
    // const keyEvents$ = mergeWith(keyDown$, keyUp$).pipe(distinctUntilChanged((a, b) => a.code === b.code && a.type === b.type), share());
    // Create KeyboardEvent Observable for specified KeyCode
    const createKeyPressStream = (charCode) =>
      keyEvents$.pipe(filter((event) => event.code === charCode.valueOf()));
    // Create Event Stream for every KeyCode in shortcut
    const keyCodeEvents$ = shortcut.map((s) => createKeyPressStream(s));
    // Emit when specified keys are pressed (keydown).
    // Emit only when all specified keys are pressed at the same time.
    // More on combineLatest below
    return combineLatest(keyCodeEvents$).pipe(
      filter((arr) => arr.every((a) => a.type === "keydown"))
    );
};

export {
    shortcut
};