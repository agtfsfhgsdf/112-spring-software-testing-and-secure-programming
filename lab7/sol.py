import angr, sys
def success_condition(state):
    return  b"Login successful" in state.posix.dumps(sys.stdout.fileno())
def fail_condition(state):
    return b"Login failed" in state.posix.dumps(sys.stdout.fileno())
pj = angr.Project('./login')
init_state = pj.factory.entry_state()
sim = pj.factory.simgr(init_state)
sim.explore(find = success_condition, avoid = fail_condition)
solution = sim.found[0]
print(solution.posix.dumps(sys.stdin.fileno()))
