# LIST Webserver

# Quick-start

1. `npm install`
2. `npm start -- config.yml`.

# Command-line Options (`--help`)

```
  Usage: server [options] <configFile>


  Options:

    --dev  Development mode
    --live Live mode
    -h, --help  output usage information
```

# DB Schema

## Stream
```
- analyses
  - rtp
    - result : string // defined in enums/analysis/outcome
    - details
        - delta_rtp_ts_vs_nt_ticks // video only
            - min : number
            - max : number
  - 2110_21_cinst
    - result : string // defined in enums/analysis/outcome
  - 2110_21_vrx
    - result : string // defined in enums/analysis/outcome
  - tsdf
    - result : string // defined in enums/analysis/outcome
    - details:
        - tsdf_max: Number // calculated as defined by the EBU recommendation
        - level: string // enums/analysis/qualitative
  - rtp_sequence:
    - result : string // defined in enums/analysis/outcome
    - details:
        - packet_count: Number // the number of captured packets
        - dropped_packets: Number // the number of dropped packets

- error_list : array of:
    - {
        - id : string // defined in enums/analysis/errors
      }

## PCAP
- summary
    - error_list : array of:
        - {
            - stream_id // null if its an error on the pcap file
            - value : as defined in stream.error_list
          }
    - warning_list : array of:
        - {
            - stream_id // null if its a warning on the pcap file
            - value:
              {
                - id : string // defined in enums/analysis/warnings
              }
          }
```
