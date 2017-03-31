require 'csv'
class PhotoUploadService
  attr_reader :csv
  def initialize(file=nil)
    file ||= './data/data_to_dl.csv'
    csv_text = File.read(file)
    @csv = CSV.parse(csv_text, :headers => true)
  end


  def parse_date_from_row(row)
    year =  row['Year'].to_i
    month = row['Month'].to_i
    day =   row['Day'].to_i

    Date.new(year, month, day)
  end

  def upload_photos(lower_limit, upper_limit)
    csv.each do |row|
      row_number = row['id'].to_i
      if row_number >= lower_limit && row_number <= upper_limit
        puts "Creating new photo..."
        file = File.open("./data/photo_#{row['id']}.jpg")
        photo_params = {
          title: row['Title'],
          caption: row['Description'],
          date: parse_date_from_row(row),
          image: file
        }
        photo = Photo.new(photo_params)
        photo.save!
        puts photo.inspect
      end
    end
  end

end
