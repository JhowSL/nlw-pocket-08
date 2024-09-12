import { CreateGoalDialog } from './components/create-goal'
import { Summary } from './components/summary'
// import { EmptyGoalsDialog } from './components/empty-goals'
import { Dialog } from './components/ui/dialog'

export function App() {
  return (
    <Dialog>
      {/* <EmptyGoalsDialog /> */}

      <Summary />
      <CreateGoalDialog />
    </Dialog>
  )
}
