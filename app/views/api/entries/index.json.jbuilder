json.array!(@entries) do |entry|
  json.partial!("entry", :entry => entry, :user => entry.user)
end