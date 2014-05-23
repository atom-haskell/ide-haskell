
# Result type enumeration
ResultType =
  Error: 0
  Warning: 1
  Lint: 2

# check results
class CheckResult
  constructor: ({@pos, @uri, @type, @desc}) ->
    

module.exports = {
  ResultType,
  CheckResult
}
