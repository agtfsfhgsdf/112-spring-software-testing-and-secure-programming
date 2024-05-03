import angr, sys

def success_condition(state):
    return b"Login successful" in state.posix.dumps(sys.stdout.fileno())

def fail_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())

proj = angr.Project("./login")
init_state = proj.factory.entry_state()
simulation = proj.factory.simgr(init_state)
simulation.explore(find=success_condition, avoid=fail_condition)

if simulation.found:
    for found_state in simulation.found:
        print(found_state.posix.dumps(sys.stdin.fileno()))
else:
    print("No valid input found.")
