import angr, sys
def success_condition(state):
    return b"successful" in state.posix.dumps(sys.stdout.fileno())
def fail_condition(state):
    return b"failed" in state.posix.dumps(sys.stdout.fileno())
pr = angr.Project("./login")
init_state = pr.factory.entry_state()
simulation = pr.factory.simgr(init_state)
simulation.explore(find=success_condition, avoid=fail_condition)
if simulation.found:
    for found_state in simulation.found:
        print(found_state.posix.dumps(sys.stdin.fileno()))
else:
    print("No valid")
